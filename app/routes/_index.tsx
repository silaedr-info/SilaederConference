import { useDisclosure } from '@mantine/hooks';
import {Grid, Textarea, Text, Title, Container, Space, Divider, SimpleGrid, TextInput, Autocomplete, Button, FileButton } from '@mantine/core';
import { useState } from "react";
import { ProjectCard } from "~/projectCard";


export default function () {
    const [opened, { open, close }] = useDisclosure(false);
    const [ currentProject, setCurrentProject ] = useState(0) // replace zero with first project of this user

    return (
        <>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Редактирование проекта
            </Title>
            <Space h="xl" />
            <Grid grow>
                <Container sx={{width: '70%'}}>
                    <Title align='center'>*project title*</Title>
                    <Text color="dimmed" size="sm" align='center' mt={5}>Заполните информацию о проекте. В описании
                        напишите хотя бы 1 абзац, загрузите картинку проекта. <br />При вводе участиков, начните писать имя
                        участника и начнеться поиск по всем ученикам Силаэдра. <br />Так же, если человек не из Силаэдра или
                        у него нет аккаунта, то можно добавить человека без аккаунта. <br />
                        При выборе научного руководителя, просто напишите его ФИО
                    </Text>
                    <Space h="xl" />
                    <TextInput label="Название проекта" placeholder="Silaeder Conference" required />
                    <Textarea
                        placeholder="Напишите хотя бы один абзац. Например: Наш проект предостовляет совокупность сервисов, позволяющих быстро и без задержек показывать презентации и организовывать расписание."
                        label="Описание"
                        withAsterisk
                    />
                    <TextInput label="Научный руководитель" placeholder="Старунова Ольга Александровна" required />
                    <Autocomplete
                        label="Секция"
                        placeholder="Начните писать"
                        data={['Информатика', 'Биология', 'Программирование', 'Математика', 'Исотрия', 'Литература', 'География', 'Обществознание', 'Английский язык']}
                    />
                    <Space h="lg" />
                    <Button.Group>
                        <FileButton accept="application/vnd.ms-powerpoint,application/pdf" onChange={(file: File | null) => {}}>
                            {(props) => <Button variant="default" {...props}>Загрузить презентацию</Button>}
                        </FileButton>
                        <Button variant="default">Просмотреть презентацию</Button>
                    </Button.Group>



                </Container>
                <Divider orientation="vertical"/>
                <Container sx={{width: '30%'}}>
                    <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
                    <ProjectCard name='Проект 1' description='проект 1.' projectId={0} section="математика" editFunc={(id: number) => {open(); setCurrentProject(id)}} />
                    <ProjectCard name='Проект 2' description='проект 2.' projectId={1} section="биология" editFunc={(id: number) => {open(); setCurrentProject(id)}} />
                    <ProjectCard name='Проект 3' description='проект 3.' projectId={2} section="программирование" editFunc={(id: number) => {open(); setCurrentProject(id)}} />
                    </SimpleGrid>
                </Container>
            </Grid>
        </>
    );
}