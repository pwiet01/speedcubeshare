<script lang="ts">
  import '../app.css';
  import '@fontsource/lato/400.css';
  import '@fontsource/lato/700.css';
  import '$lib/assets/fontawesome/css/all.min.css';
  import Header from './_components/Header.svelte';
  import Footer from './_components/Footer.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { globalConfig } from '$lib/config/globalConfig';
  import { t } from '$lib/translations';
  import type { Page } from '@sveltejs/kit';
  import { dev } from '$app/environment';
  import { getFlash } from 'sveltekit-flash-message';
  import Toast from '$lib/components/Toast.svelte';
  import { enhance } from '$app/forms';
  import { user } from '$lib/ts/stores';

  $: mustConfirmEmail = $user && !$user.email_confirmed;
  let allowConfirmMailResend = true;

  $: pageTitle = getPageTitle($page);

  $: keywords =
    globalConfig.meta.defaultKeywords +
    ($page.data?.meta?.keywords ? ', ' + $page.data.meta.keywords : '');

  $: description = $page.data?.meta?.description ?? globalConfig.meta.defaultDescription;

  const titleSuffix = ` | ${globalConfig.meta.defaultTitle}`;

  const maxWidthMapping: { [key: string]: string } = {
    small: 'max-w-[50rem]',
    max: 'max-w-[110rem]',
  };

  const flash = getFlash(page);

  onMount(() => {
    setDocHeight();
  });

  function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }

  function getPageTitle(page: Page) {
    if (page.error) {
      return `(${page.status}) ${$t(page.error.message ?? 'error.error')}`;
    }

    if (!page.data?.meta?.title) {
      return globalConfig.meta.defaultTitle;
    }

    let title = page.data.meta.title;
    if (!page.data.meta.disableTitleTranslation) {
      title = $t(title);
    }

    return title;
  }
</script>

{#if mustConfirmEmail}
  <div
    class="bg-error body-full-width-section flex justify-center items-center gap-2 sm:gap-3 text-error-content py-1"
  >
    <div class="flex items-center gap-2">
      <i class="fa-solid fa-circle-exclamation" />
      <p class="text-sm sm:text-base">{$t('common.auth.confirmEmail.confirmPrompt')}</p>
    </div>
    <button
      type="button"
      on:click={() => window.location.reload()}
      class="btn btn-xs sm:btn-sm btn-link text-error-content normal-case !p-0"
    >
      {$t('common.auth.confirmEmail.refresh')}
    </button>
    <form
      use:enhance={() => {
        allowConfirmMailResend = false;
      }}
      method="post"
      action="/confirm-email"
      class="flex items-center"
    >
      <input type="hidden" name="redirectPath" value={$page.url.pathname} />

      <button
        type="submit"
        class="btn btn-xs sm:btn-sm btn-link text-error-content normal-case !p-0 !bg-transparent"
        disabled={!allowConfirmMailResend}
      >
        {$t('common.auth.confirmEmail.resend')}
      </button>
    </form>
  </div>
{/if}

<Header debug={dev} />

<main
  class="flex flex-col flex-1 pt-6 pb-10 {maxWidthMapping[
    $page.data?.layout?.maxWidth ?? 'max'
  ]} mx-auto w-full"
>
  {#if !$page.error && $page.data?.layout?.showTitle}
    <h1 class="mb-6 text-4xl">{pageTitle}</h1>
  {/if}

  <slot />
</main>

<Footer />

<svelte:window on:resize={setDocHeight} on:orientationchange={setDocHeight} />

<svelte:head>
  <title>{pageTitle + ($page.error || $page.data?.meta?.title ? titleSuffix : '')}</title>
  <meta name="keywords" content={keywords} />
  <meta name="description" content={description} />
</svelte:head>

{#if $flash}
  <Toast
    type="alert-{$flash.type} text-{$flash.type}-content"
    spacing={mustConfirmEmail ? 'top-24' : 'top-16'}
  >
    {$t($flash.message)}
  </Toast>
{/if}
