import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    rem, Group
} from '@mantine/core';

export default function () {
    const linkStyle = {
        textDecoration: 'none',
        color: "#228be6"
    }
    return (
        <Container size={580} my={40}
                   sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}>
            <Title
                sx={{ fontWeight: 900 }}
                align={'center'}>
                Добро пожаловать!</Title>
            <Title order={3} align={'center'} sx={{paddingTop: rem(15)}}>
                <a href='/auth' style={linkStyle}>Войдите</a>, или
                продолжите как гость. <br />
            </Title>
            <Group align={'center'} sx={{paddingTop: rem(15)}}>
                <Anchor align='center' href="/schedule" style={linkStyle}>Расписание ближайшей конференции</Anchor>
                <br /><Anchor align='center' href="/showcase" style={linkStyle}>витрина проектов силаэдра</Anchor>
            </Group>
        </Container>
    )
}