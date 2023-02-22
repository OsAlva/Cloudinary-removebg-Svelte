<script lang="ts">
  import {Cloudinary} from "@cloudinary/url-gen"
  import Dropzone from 'dropzone'
  import 'dropzone/dist/dropzone.css'
  import {ImageStatus} from "./types.d"
  import {imageStatus, modifiedImage, originalImage} from "./store"
  import {onMount} from 'svelte'
  import {backgroundRemoval} from '@cloudinary/url-gen/actions/effect'


  const cloudinary = new Cloudinary({
    cloud: {
        cloudName: 'dr0kvqrk0'
    },
    url: {
        secure: true, //para que cree con http
    }
  })



   onMount(() =>{
    const dropzone = new Dropzone('#dropzone', {
        uploadMultiple: false,
        acceptedFiles: '.jpg, .png, .webp, jpeg',
        maxFiles: 1,
    })

    dropzone.on('sending', (file, xhr, formData) => {
        imageStatus.set(ImageStatus.UPLOADING);

        //aqui apiKey and settings
        formData.append('upload_preset', "ml_default")
        formData.append('timeestamp', (Date.now() / 1000))
        formData.append('api_key', '268197355826219')
    })

    dropzone.on('success', (file, response) =>{
       
        const {
            public_id: publicId,
            secure_url: url
        } = response

        //creamos la img con fondo transparente
        //y guardamos en el backgroundImage
        const imageWithoutBackground = cloudinary.image(publicId).effect(backgroundRemoval())
        console.log("imagen sin fondo", imageWithoutBackground.toURL());

        imageStatus.set(ImageStatus.DONE)
        modifiedImage.set(imageWithoutBackground.toURL());
        originalImage.set(url)

     
        console.log('Todo ok!');
        console.log(response)
    })

    dropzone.on('error', (file, response) => {
        console.log('Error!');
        console.log(response)
    })
   })
</script>

<form 
    id="dropzone" class="shadow-2xl border-dashed border-2 border-gray-300 rounded-lg aspect-video w-full flex items-center justify-center flex-col"
    action="https://api.cloudinary.com/v1_1/dr0kvqrk0/image/upload"
    >
   <!-- el dolar significa observa y subscribete al imageStatus importante -->
    {#if $imageStatus === ImageStatus.READY}
    <button class="pointer-events-none bg-blue-800 rounded-full text-white text-xl px-6 py-4">
        Upload files
    </button>
    <strong class="text-lg mt-4 text-gray-800">or drop a file</strong>
    

    {:else if $imageStatus === ImageStatus.UPLOADING}
    <strong class="text-lg mt-4 text-gray-800">uploading files...</strong>
    {/if}
</form>