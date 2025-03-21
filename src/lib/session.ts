import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose";
 
type SessionPayload = {
    sub: string;
    name: string;
    username: string;
}

export async function encrypt(payload: SessionPayload, encodedKey: Uint8Array) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey)
}

export async function createSession(userId: number, name: string, username: string, secretKey: string) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt(
        {
            sub: String(userId),
            name,
            username,
        } as SessionPayload,
        new TextEncoder().encode(secretKey)
    );
    const cookieStore = await cookies();
   
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: "lax",
        path: "/",
    })
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET_KEY), {
            algorithms: ["HS256"],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session');
        console.log(error);
    }
}