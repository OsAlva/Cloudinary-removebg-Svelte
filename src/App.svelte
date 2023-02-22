<script lang="ts">
  import CloudinaryLogo from './assets/CloudinaryLogo.svelte';
  import StepEdit from './StepEdit.svelte';
  import StepUpload from './StepUpload.svelte';
  
  import {imageStatus} from './store.js';
  import { ImageStatus } from './types.d';
</script>




<div class="max-w-xl grid grid-cols-1 m-auto place-content-center h-screen p-4">
  <header class="flex justify-center py-10">
    <h1 class="text-4xl font-bold text-blue-800 tracking-tighter">
      OsAlva<span class="text-blue-400">remove.bg</span> 
    </h1>
  </header>

  <main class="w-full block">
    {#if $imageStatus === ImageStatus.READY  || $imageStatus === ImageStatus.UPLOADING}
    <StepUpload/>
    {:else if $imageStatus === ImageStatus.DONE}
    <StepEdit/>
    {/if}
  </main>


  <footer class="flex justify-center items-center gap-x-2 font-semibold pt-10">
    Hecho con <a href="http://cloudinary" target="_blank" rel="noreferrer"><CloudinaryLogo/></a>
  </footer>

</div>


