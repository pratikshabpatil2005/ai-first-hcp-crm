from fastapi import Depends, HTTPException

from app.dependencies import get_current_user


def require_roles(*roles):
    def role_checker(current_user=Depends(get_current_user)):
        user_role = current_user.get("role")

        if user_role not in roles:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to perform this action."
            )

        return current_user

    return role_checker