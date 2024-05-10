enum Role {
    ADMIN = 'Admin',
    MANAGER = 'Manager',
    USER = 'User',
    SUPER_ADMIN = 'SuperAdmin',
}

export const EDIT_ROLES = [Role.ADMIN, Role.SUPER_ADMIN];
export const VIEW_ROLES = [Role.MANAGER, Role.ADMIN, Role.SUPER_ADMIN];
