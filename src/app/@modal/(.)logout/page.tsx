"use client"

import { UserLogoutForm } from "@/app/logout/_containers/user-logout-form";
import UserLogoutModal from "@/features/users/componentes/user-logout-modal";


export default function UserLoginFormModal() {
    return (
        <UserLogoutModal>
            <UserLogoutForm />
        </UserLogoutModal>
    )
}