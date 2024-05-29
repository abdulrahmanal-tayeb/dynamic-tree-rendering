from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Node
from tree_be.serializers import NodeSerializer


@api_view(["POST", "GET"])
def nodes_view(request):
    if request.method == "POST":
        serialized = NodeSerializer(data=request.data)
        if serialized.is_valid():
            serialized.save()
            return Response(status=201)
        return Response(serialized.errors, status=400)
    return Response(NodeSerializer(Node.objects.filter(is_parent=True), many=True).data, status=200)
    