import { db } from "~/utils/db.server";
import type { ActionArgs } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import { useActionData } from "@remix-run/react";
import { toArray } from "vite-node/utils";

export const action = async ({ request }: ActionArgs) => {
    const user = await requireUserId(request);
    const form = await request.formData();
    const name = form.get("name");
    const description = form.get("description");
    const tutor = form.get("tutor");
    const participants = form.get("participants");
    const section = form.get("section");
    const time_for_speech = form.get("time_for_speech");
    const presentation_storage = form.get("presentation_storage");
    const presentation_path = form.get("presentation_path");

    if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof tutor !== "string" ||
        typeof participants !== "string" ||
        typeof presentation_storage !== "string" ||
        typeof presentation_path !== "string" ||
        typeof section !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: "Form not submitted correctly.",
        });
    }

    // const fields = { name, description, tutor, participants, section,
    //     time_for_speech, user};
    const time_for_speech_new = parseInt(String(time_for_speech))
    const confCursor = db.conference.aggregate({
        _max: {
            id: true
        }
    });

    const [confResult] = await Object(confCursor);
    const conf = Promise.resolve(confResult._max.id);

    const project = await db.project.create({
        data: {
            name: name,
            description: description,
            tutor: tutor,
            participants: participants,
            section: section,
            time_for_speech: time_for_speech_new,
            conf: conf
        },
    });
    const presentation = await db.presentation.create({
        data: { storage_type: presentation_storage, path: presentation_path, is_approved: false, project }
    })
    return json(project);
};
export default function MainPageRoute () {
    useActionData<typeof action>();
    return (
        <div>
            <form method={ "post" }>
                <input type={ "text" } defaultValue={ "Название" } id={ "name" } />
                <input type={ "text" } defaultValue={ "Описание" } id={ "description" } />
                <input type={ "text" } defaultValue={ "Участники" } id={ "participants" } />
                <input type={ "text" } defaultValue={ "Научный руководитель" } id={ "tutor" } />
                <input type={ "text" } defaultValue={ "Секция" } id={ "section" } />
                <label htmlFor={ "time_for_speech" }>Время на доклад</label>
                <input type={ "number" } defaultValue={ 5 } id={ "time_for_speech" }/>
                <input type={ "text" } id={ "presentation_storage" } />
                <input type={ "text" } id={ "presentation_path" } />
            </form>
            <form action={"/logout"}>
                <button type={"submit"}>Logout</button>
            </form>
        </div>
    );

}