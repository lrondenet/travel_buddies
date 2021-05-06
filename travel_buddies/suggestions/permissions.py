from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the user of the sugesstions.
        return obj.user_id == request.user.id

class NotEditableAndReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'PUT' or request.method == 'PATCH':
            return False
        return True