<script lang="ts">
  import { t } from '$lib/translations';
  import { onMount } from 'svelte';
  import type { FormValidationResult } from '$lib/ts/formUtils/types';

  export let username: string;
  export let usernameValid: boolean;
  let usernameAvailable: Promise<boolean | undefined> | undefined = undefined;

  let currentTimeout: number | undefined = undefined;
  $: startUsernameTimeout(username, usernameValid);

  function startUsernameTimeout(current: string, isValid: boolean) {
    // cancel old timeout
    clearTimeout(currentTimeout);
    usernameAvailable = undefined;

    if (isValid) {
      currentTimeout = setTimeout(() => checkUsernameAvailability(current.trim()), 1000);
    }
  }

  function checkUsernameAvailability(current: string) {
    usernameAvailable = fetch(`/api/username-availability/${current}`)
      .then((response) => response.json())
      .then((jsonResponse) => (jsonResponse as FormValidationResult).success)
      .catch((_) => undefined);
  }

  onMount(() => {
    // clear timeout before unmounting
    return () => clearTimeout(currentTimeout);
  });
</script>

{#if usernameValid}
  {#await usernameAvailable}
    <span class="loading loading-dots loading-xs text-primary" />
  {:then available}
    {#if available === undefined}
      <span />
    {:else if available}
      <i class="fa-solid fa-circle-check text-success" />
    {:else}
      <span class="text-error">
        <i class="fa-solid fa-circle-xmark mr-1" />
        {$t('error.formValidation.usernameAlreadyTaken')}
      </span>
    {/if}
  {/await}
{:else}
  <span />
{/if}
