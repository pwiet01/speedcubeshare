<script lang="ts">
  import { t } from '$lib/translations';
  import { onMount } from 'svelte';
  import type { FormValidationResult } from '$lib/ts/formUtils/types';

  export let username: string;
  export let usernameValid: boolean;
  let usernameAvailable: Promise<boolean | undefined> | undefined = undefined;

  let isMounted = false;
  let currentTimeout: number | undefined = undefined;
  $: if (isMounted) startUsernameTimeout(username, usernameValid);

  function startUsernameTimeout(current: string, isValid: boolean) {
    clearTimeout(currentTimeout);
    usernameAvailable = undefined;

    if (isValid) {
      currentTimeout = window.setTimeout(() => checkUsernameAvailability(current.trim()), 1000);
    }
  }

  function checkUsernameAvailability(current: string) {
    usernameAvailable = fetch(`/api/username-availability/${current}`)
      .then((response) => response.json())
      .then((jsonResponse) => (jsonResponse as FormValidationResult).success)
      .catch(() => undefined);
  }

  onMount(() => {
    isMounted = true;
    return () => clearTimeout(currentTimeout);
  });
</script>

{#if usernameValid}
  {#await usernameAvailable}
    <span class="loading loading-dots loading-xs text-primary" />
  {:then available}
    {#if available}
      <i class="fa-solid fa-circle-check text-success" />
    {:else if available !== undefined}
      <span class="text-error">
        <i class="fa-solid fa-circle-xmark mr-1" />
        {$t('error.formValidation.usernameAlreadyTaken')}
      </span>
    {/if}
  {/await}
{/if}
