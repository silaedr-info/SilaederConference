import {Button, Box, rem, Tooltip, TextInput, Group} from '@mantine/core';
import {useForm} from '@mantine/form';
import emailjs from '@emailjs/browser';
import {useEffect} from "react";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export async function loader() {
    return json({
        ENV: {
            PUBLIC_KEY: process.env.PUBLIC_KEY,
            SERVICE_ID: process.env.SERVICE_ID,
            TEMPLATE_ID: process.env.TEMPLATE_ID,
        },
    });
}
export default function () {
    const data = useLoaderData<typeof loader>();

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function send_email(email: string, name: string) {
        // @ts-ignore
        emailjs.send(data.ENV.SERVICE_ID, data.ENV.TEMPLATE_ID, {
            to_email: email,
            to_name: name,
            message: getRandomInt(1000, 9999),
        }, data.ENV.PUBLIC_KEY);
    }

    return (
        <>
            <Box maw={300} mah={300} mt="xl" mx="auto">
                <form onSubmit={form.onSubmit((values) => send_email(values.email, values.name))}>
                    <TextInput
                        withAsterisk
                        label="Your name"
                        placeholder="John Doe"
                        {...form.getInputProps('name')}
                    />

                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />

                    <Group position="right" mt="md">
                        <Button variant="light" type="submit">Submit</Button>
                    </Group>
                </form>

            </Box>
        </>
    )
}