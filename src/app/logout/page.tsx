"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    useEffect (() => {
        onClickLogoutButton();
    }, [])
}

async function onClickLogoutButton() {
    await fetch(`${process.env.ROUTE_HANDLERS_BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    redirect("/projects");
}