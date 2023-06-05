import type { V2_MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { MantineProvider, createEmotionCache, AppShell } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { HeaderResponsive } from "~/header";
import { FooterCentered } from "~/footer";

export const meta: V2_MetaFunction = () => (
    [
      {name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"},
      {title: "Silaeder Conference"},
    ]
);


createEmotionCache({ key: 'mantine' });

export default function App() {
    const header = (
        <HeaderResponsive links={[
            {label: "Авторизация", link: '/auth'},
            {label: "Витрина проектов", link: '/showcase'},
            {label: "Расписание конференции", link: '/schedule'},
        ]} />
    );
    const footer = (
        <FooterCentered />
    );
  return (
      <MantineProvider theme={{
        colorScheme: 'light',
      }} withGlobalStyles withNormalizeCSS>
        <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
        <AppShell
            padding="md"
            header={header}
            footer={footer}
            sx={{backgroundColor: '#f1f3f5'}}
        >
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </AppShell>
        </body>
        </html>
      </MantineProvider>
  );
}