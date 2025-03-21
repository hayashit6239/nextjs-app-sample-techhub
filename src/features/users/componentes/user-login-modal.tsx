import { BaseModal } from "@/components/modal";

type Props = {
    children: React.ReactNode;
}

export default function UserLoginModal(props: Props) {
    const { children } = props;

    return (
        <BaseModal elementName="user-login-modal">
            {children}
        </BaseModal>
      );
}