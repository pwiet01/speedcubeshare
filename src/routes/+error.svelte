<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { t } from '$lib/translations';

  let internalErrorModal: HTMLDialogElement;

  onMount(() => {
    if ($page.status >= 500) {
      internalErrorModal.showModal();
    }
  });
</script>

<div class="w-full flex-1 flex flex-col justify-center items-center text-center">
  <h1 class="text-[8rem] sm:text-[12rem] leading-none opacity-20">{$page.status}</h1>
  <h2 class="max-w-2xl">{$t($page.error?.message ?? 'error.error')}</h2>
</div>

<Modal
  title={$t('error.internal')}
  text={$t('error.internalHint')}
  bind:modalRef={internalErrorModal}
/>
