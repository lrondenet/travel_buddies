from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the user of the sugesstions.
        return obj.user == request.user


class IsOwnerNotEditableOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'PUT':
            return False
        return True