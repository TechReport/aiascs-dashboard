import axios from 'axios'

async function loadSession() {
    try {
        const { data, error } = await axios.get('http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk')
        if (error) throw error

        return { status: true, data: data }

    } catch (err) {
        return { status: false, data: err }
    }
}

export default loadSession