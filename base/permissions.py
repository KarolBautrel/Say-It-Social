from rest_framework import permissions


class RequestUserAllowed(permissions.BasePermission):
    message = 'Only user of profile can update his account'

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        if obj == request.user:
            return True
        return False


class HostEditAllow(permissions.BasePermission):
    message = 'Only host of room is allowed to edit room '

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.host == request.user:
            return True
        return False


class MessageCreatorAllow(permissions.BasePermission):
    message = 'Only creator of messsage is allowed to edit message '

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.user == request.user:
            return True
        return False
