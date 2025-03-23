"use client"

import { UserLoginForm } from "@/app/login/_containers/user-login-form";
import UserLoginModal from "@/features/users/componentes/user-login-modal";


export default function UserLoginFormModal() {
    return (
        <UserLoginModal>
            <UserLoginForm />
        </UserLoginModal>
    )
}