from django.db import models

class Node(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField(null=True, blank=True)
    children = models.ManyToManyField("self", blank=True, related_name="parent", symmetrical=False)
    is_parent = models.BooleanField(default=False)
    def __str__(self):
        return self.name
    
    