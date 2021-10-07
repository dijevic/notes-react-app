export const uploadFile = async (file) => {


    const url = `https://api.cloudinary.com/v1_1/dqrgocc8c/image/upload`

    try {


        const formData = new FormData();
        formData.append('upload_preset', `iwqnrdv0`)
        formData.append('file', file)

        const resp = await fetch(url, {
            method: 'POST',
            body: formData


        })

        if (resp.ok) {
            const firstData = await resp.json()
            return firstData.secure_url
        } else {
            throw await resp.json()
        }
    } catch (e) {
        console.log(e)
    }



}