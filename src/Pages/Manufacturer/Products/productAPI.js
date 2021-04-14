// Task API
import { ApiCore } from '../../../Services/api/Core'


// plural and single may be used for message logic if needed in the ApiCore class.

const productAPI = new ApiCore({
    getAll: true,

    // getSingle: true,
    post: true,
    deleteOne: true
});

// apiTasks.massUpdate = () => {
//     // Add custom api call logic here
// }

export { productAPI };