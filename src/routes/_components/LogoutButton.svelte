<script>
  import { t } from '$lib/translations/index';
  import { enhance } from '$app/forms';

  export let formClass = '';
  export let buttonClass = '';
</script>

<form use:enhance action="/logout" method="post" class={formClass}>
  <button type="submit" class="btn btn-error {buttonClass}">
    {$t('common.auth.signOut')}
  </button>
</form>
