<script lang="ts">
  import { enhance } from '$app/forms';

  export let title: string | undefined = undefined;
  export let titleSize = 'text-2xl';
  export let titleMargin = 'mb-6';

  export let maxWidth = 'max-w-[25rem]';
  export let wrapperClass = '';
  export let actionsMargin = 'mt-4';
  export let inputsGap = 'gap-1';

  function toggleButtonLoadingState(button: HTMLElement | null, loading: boolean) {
    if (!button) {
      return;
    }

    if (button instanceof HTMLButtonElement) {
      button.disabled = loading;
    }

    if (loading) {
      const loadingSpinner = document.createElement('span');
      loadingSpinner.classList.add('loading', 'loading-dots');
      button.insertBefore(loadingSpinner, button.firstChild);
    } else {
      const loadingSpinner = button.querySelector('.loading');

      if (loadingSpinner) {
        button.removeChild(loadingSpinner);
      }
    }
  }
</script>

<div class="mx-auto w-full {maxWidth} {wrapperClass}">
  <form
    use:enhance={({ submitter }) => {
      toggleButtonLoadingState(submitter, true);

      return ({ update }) => {
        toggleButtonLoadingState(submitter, false);
        update();
      };
    }}
    {...$$restProps}
  >
    {#if title}
      <h1 class="{titleSize} {titleMargin}">{title}</h1>
    {/if}

    <div class="flex flex-col {inputsGap}">
      <slot />
    </div>

    {#if $$slots.actions}
      <div class={actionsMargin}>
        <slot name="actions" />
      </div>
    {/if}
  </form>
</div>
