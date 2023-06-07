import { db } from "~/utils/db.server";
import type { ActionArgs } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";
import { json } from "@remix-run/node";
// import { requireUserId } from "~/utils/session.server";
import { token } from "./auth._index";
import { useActionData } from "@remix-run/react";
import {SyntheticEvent} from "react";
// import { toArray } from "vite-node/utils";

const action = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        name: {value: string},
        description: {value: string},
        tutor: {value: string},
        participants: {value: string},
        section: {value: string},
        time_for_speech: {value: number},
        presentation_storage: {value: string},
        presentation_path: {value: string}
    };
    const name = target.name.value;
    const description = target.description.value;
    const tutor = target.tutor.value;
    const participants = target.participants.value;
    const section = target.section.value;
    const time_for_speech = target.time_for_speech.value;
    const presentation_storage = target.presentation_storage.value;
    const presentation_path = target.presentation_path.value;

    // const fields = { name, description, tutor, participants, section,
    //     time_for_speech, user};
    const time_for_speech_new = parseInt(String(time_for_speech))
    const confCursor = db.conference.aggregate({
        _max: {
            id: true
        }
    });

    const [confResult] = await Object(confCursor);
    const schedule_pos = await db.project.aggregate({
        _max: {
            schedule_pos: true
        }
    })


    const project = await db.project.create({
        data: {
            name: name,
            description: description,
            tutor: tutor,
            participants: participants,
            section: section,
            time_for_speech: time_for_speech_new,
            conf_id: confResult[0],
            active: false,
            schedule_pos: Number(schedule_pos._max)
        },
    });
    const presentation = await db.presentation.create({
        data: { storage_type: presentation_storage, path: presentation_path, is_approved: false, project_id: project.id }
    })
    return json(project);
};

// export async function logout () {
//     return json(token, {
//         headers: {
//             "Set-Cookie": await cookie.serialize("", {
//                 expires: new Date(0),
//             }),
//         },
//     });
// }

export default function MainPageRoute () {
    return (
        <div>
            <form
                onSubmit={ action }>
                <input type={ "text" } defaultValue={ "Название" } name={ "name" } />
                <input type={ "text" } defaultValue={ "Описание" } name={ "description" } />
                <input type={ "text" } defaultValue={ "Участники" } name={ "participants" } />
                <input type={ "text" } defaultValue={ "Научный руководитель" } name={ "tutor" } />
                <input type={ "text" } defaultValue={ "Секция" } name={ "section" } />
                <input type={ "number" } defaultValue={ 5 } name={ "time_for_speech" }/>
                <input type={ "text" } name={ "presentation_storage" } defaultValue={ "local" } />
                <input type={ "text" } name={ "presentation_path" } defaultValue={ "file://example" } />
                <button type={ "submit" }> Submit </button>
            </form>
            {/*<form onClick={ logout }>*/}
            {/*    <button type={"submit"}>Logout</button>*/}
            {/*</form>*/}
        </div>
    );

}