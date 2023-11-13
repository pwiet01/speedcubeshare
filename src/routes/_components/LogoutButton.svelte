<script lang="ts">
  import { t } from '$lib/translations/index';
  import { enhance } from '$app/forms';

  export let formClass = '';
  export let buttonClass = '';

  export let submitCallback = () => {};
</script>

<form use:enhance={submitCallback} action="/logout" method="post" class={formClass}>
  <button type="submit" class="btn btn-error {buttonClass}">
    {$t('common.auth.signOut')}
  </button>
</form>
