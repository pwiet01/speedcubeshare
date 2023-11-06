<script lang="ts">
  export let title: string | undefined = undefined;
  export let titleSize = 'text-2xl';
  export let titleMargin = 'mb-6';

  export let maxWidth = 'max-w-[25rem]';
  export let wrapperClass = '';
  export let actionsMargin = 'mt-4';
  export let inputsGap = 'gap-1';
</script>

<div class="mx-auto w-full {maxWidth} {wrapperClass}">
  <form {...$$restProps}>
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
