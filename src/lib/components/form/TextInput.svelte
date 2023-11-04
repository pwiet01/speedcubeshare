<script lang="ts">
  export let label: string | undefined = undefined;
  export let labelSize = 'text-base';

  export let inputId: string;
  export let inputName = inputId;
</script>

<div class="relative">
  {#if label}
    <label class="block mb-1 {labelSize}" for={inputId}>{label}</label>
  {/if}

  <input class="input input-bordered w-full" id={inputId} name={inputName} {...$$restProps} />
</div>
