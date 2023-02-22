<script lang="ts">
    import "two-up-element"
    import {originalImage} from './store'
    import {modifiedImage} from './store'

    let processingImage = true
    let tries = 0
    let intervalId: any

    //parecido a un useeffect
    $: {
        if (processingImage){
            clearInterval(intervalId);
            intervalId =  setInterval(() =>{
                tries++;
                const  img=new Image()
                img.src= $modifiedImage
                img.onload = () => {
                    processingImage = false
                    clearInterval(intervalId)
                }
            },500)         
        }
    }

</script>

<two-up>
    <img src={$originalImage} alt="imagen original"/>
    {#if processingImage}
        <div class="flex flex-col justify-center items-center">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <p class="text-center mt-4">
                Procesando imagen...
            </p>
        </div>
    {:else }
    <img src={$modifiedImage} alt="imagen medificiada"/>
    {/if}
</two-up>

<a download href={$modifiedImage} class=" block bg-blue-500 hover:bg-blue-700 text-xl text-center w-full font-bold text-white rounded-full px-4 py-2 mt-12 ">
    Descargar imagen modificada
</a>