<script lang="ts">
  export let value = '';

  export let label: string | undefined = undefined;
  export let info: string | undefined = undefined;

  export let error: string | undefined = undefined;

  export let errorHighlight: boolean = false;
  $: errorHighlight = error !== undefined;

  export let inputId: string;
  export let inputName = inputId;

  export let wrapperClass = '';

  export let required = true;
</script>

<div class="form-control w-full {wrapperClass}">
  {#if label}
    <label class="block mb-1" for={inputId}>
      <span class="label-text">{label}</span>

      {#if required}
        <span class="label-text text-error">*</span>
      {/if}

      {#if $$slots.afterLabelInfo}
        <span class="ml-2 label-text-alt">
          <slot name="afterLabelInfo" />
        </span>
      {/if}
    </label>
  {/if}

  <input
    on:input={() => (errorHighlight = false)}
    bind:value
    class="input input-bordered transition-colors w-full{errorHighlight ? ' input-error' : ''}"
    id={inputId}
    name={inputName}
    {required}
    {...$$restProps}
  />

  {#if error}
    <label class="block" for={inputId}>
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}

  {#if info}
    <label class="mt-2 text-info label-text-alt" for={inputId}>
      <i class="fa-solid fa-circle-info text-info mr-1" />
      {info}
    </label>
  {/if}
</div>
