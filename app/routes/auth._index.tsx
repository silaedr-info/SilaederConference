import { HeaderResponsive } from '~/header'
import { FooterCentered } from "~/footer";
import { AppShell } from "@mantine/core";

export default function () {
    const header = (
        <HeaderResponsive links={[
            {label: "Авторизация", link: '/auth'},
            {label: "Витрина проектов", link: '/showcase'},
            {label: "Расписание конференции", link: '/schedule'},
        ]} />
    )
    const footer = (
        <FooterCentered />
    )
    return (
        <AppShell
            padding="md"
            header={header}
            footer={footer}
        >
            {/* Your application here */}
        </AppShell>
    )
}