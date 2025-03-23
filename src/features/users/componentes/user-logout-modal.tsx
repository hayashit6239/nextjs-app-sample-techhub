import { BaseModal } from "@/components/modal";

type Props = {
    children: React.ReactNode;
}

export default function UserLogoutModal(props: Props) {
    const { children } = props;

    return (
        <BaseModal elementName="user-logout-modal">
            {children}
        </BaseModal>
      );
}