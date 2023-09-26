from rest_framework import serializers
class QuizResponseSerializer(serializers.Serializer):
    answers = serializers.JSONField()
