import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

// Configuración del entorno cloudinary
cloudinary.config({
    cloud_name: 'dngscqnjq',
    api_key: '495431713854892',
    api_secret: 'TNlaGfhTYOzmGN04Y-Sbw9weAM4',
    secure: true
});

describe('test fileUpload.js', () => {

    test('debe subir el archivo correctamente a cloudinary', async () => {
        // Como la función de fileUpload recibe un File, se debe de crear el File de prueba
        const imgUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch(imgUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'img-test.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        // cloudinary.v2.api.delete_resources(public_ids, options).then(callback);
        // https://res.cloudinary.com/dngscqnjq/image/upload/v1672162395/journal-app/iphqiji5myzjzwqnsm2k.jpg

        const segments = url.split('/');
        const imageId = segments[segments.length-1].replace('.jpg','');

        await cloudinary.api.delete_resources(['journal-app/'+imageId]);
    })

    test('debe de retornar null', async () => {
        const file = new File([], 'img-test.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
})