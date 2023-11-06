<script lang="ts">
  import { t } from '$lib/translations';
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import TextInput from '$lib/components/form/TextInput.svelte';
  import { getTranslatedFormErrors } from '$lib/ts/formUtils/formClientUtils';

  export let form;
  $: formErrors = getTranslatedFormErrors(form?.errors);
</script>

<FormLayout
  method="post"
  title={$t('common.auth.signUp')}
  wrapperClass="flex-1 flex flex-col justify-center"
>
  <TextInput
    value={form?.data?.email ?? ''}
    error={formErrors['email']}
    label={$t('common.auth.email')}
    inputId="email"
    type="email"
    autocomplete="email"
    required
  />

  <TextInput
    label={$t('common.auth.password')}
    inputId="password"
    type="password"
    autocomplete="current-password"
    required
  />

  <TextInput
    value={form?.data?.username ?? ''}
    error={formErrors['username']}
    label={$t('common.user.username')}
    inputId="username"
    autocomplete="username"
    required
    wrapperClass="mt-4"
  />

  <TextInput
    value={form?.data?.displayName ?? ''}
    error={formErrors['displayName']}
    label={$t('common.user.displayName')}
    inputId="displayName"
    autocomplete="name"
    required
  />

  <div class="flex flex-col items-center" slot="actions">
    <button class="btn btn-primary w-full" type="submit">{$t('common.auth.signUp')}</button>
    <a class="mt-5" href="/login">{$t('common.auth.loginWithExisting')}</a>
  </div>
</FormLayout>
