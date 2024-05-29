from rest_framework import serializers
from .models import Node
from django.db import transaction
class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    parent_id = serializers.IntegerField(default=0)
    class Meta:
        model = Node
        fields = ('id', 'name', 'link', 'children', 'parent_id', 'is_parent')

    def get_children(self, obj):
        children = obj.children.all()
        if len(children) > 0:
            return NodeSerializer(children, many=True, context=self.context).data
        return []

    def create(self, validated_data):
        parent_id = validated_data.pop('parent_id', [])
        with transaction.atomic():
            node = Node.objects.create(**validated_data)
            if(node and parent_id):
                parent = Node.objects.filter(id=parent_id).first()
                if not parent:
                    raise serializers.ValidationError("Parent Not Found")
                parent.children.add(node)

        return node
