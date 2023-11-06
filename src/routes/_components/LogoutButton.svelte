<script>
  import { t } from '$lib/translations/index';

  export let formClass = '';
  export let buttonClass = '';
</script>

<form action="/logout" method="post" class={formClass}>
  <button type="submit" class="btn btn-error {buttonClass}">
    {$t('common.auth.signOut')}
  </button>
</form>
