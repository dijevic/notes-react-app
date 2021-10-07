import { db } from "../firebase/firebaseConfig"
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { types } from "../tipos/types"
import { loadNotes } from "../helpers/loadNoptes"
import Swal from "sweetalert2"
import { uploadFile } from "../helpers/fileUpload"

export const startNewNote = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth

        const newNote = {
            body: '',
            title: '',
            imgUrl: '',
            date: new Date().getTime()
        }

        try {
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)

            newNote.id = docRef.id
            dispatch(newEntry(newNote))


            dispatch(activeNote(docRef.id, newNote))

        } catch (e) {
            console.log(e)
        }



    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSavingNote = (note) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().auth
            if (note.img === undefined) {
                delete note.img

            }

            const noteToBeSaved = { ...note }
            delete noteToBeSaved.id


            const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

            await updateDoc(noteRef, noteToBeSaved);
            dispatch(refreshNote(note))

            Swal.fire({
                title: `note saved !`,
                text: `${note.title} saved`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })

        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: 'something went wrong with our data base :(',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(e)
        }

    }

}

export const startUploadImg = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            text: `please wait...`,
            title: `uploading`,
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }


        })

        try {
            const types = ['image/svg+xml', 'image/jpeg', 'image/png']

            if (!types.includes(file.type)) {
                Swal.close()
                return Swal.fire({
                    title: 'Error!',
                    text: 'something went wrong with your file :(',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }


            const uploadFileCloud = await uploadFile(file)
            activeNote.img = uploadFileCloud
            dispatch(startSavingNote(activeNote))
            Swal.close()
        } catch (e) {
            console.log(e)
        }



    }
}
export const StartDeletingNote = (id) => {

    return async (dispatch, getState) => {
        Swal.fire({
            text: `please wait...`,
            title: `deleting`,
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }


        })

        const { uid } = getState().auth


        try {
            await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
            dispatch(deleteNote(id))

            Swal.close()
            Swal.fire({
                title: `note deleted !`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        } catch (error) {
            console.log(error)
        }
    }


}

export const logOutcleaningNotes = () => {
    return {
        type: types.notesLogOutCleaning,
    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDeleted,
        payload: id
    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        },
    }
}


export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }

}

export const refreshNote = (note) => {
    return {
        type: types.notesUpdated,
        payload: {
            note
        }
    }

}

export const newEntry = (note) => {
    return {
        type: types.notesAddNew,
        payload: {
            ...note
        },
    }

}

