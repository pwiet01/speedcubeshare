<script lang="ts">
  import { t } from '$lib/translations';
  import FormLayout from '$lib/components/form/FormLayout.svelte';
  import TextInput from '$lib/components/form/TextInput.svelte';

  export let form;
</script>

<FormLayout
  method="post"
  title={$t('common.auth.signUp')}
  wrapperClass="flex-1 flex flex-col justify-center"
>
  <TextInput
    value={form?.data?.email ?? ''}
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
    label={$t('common.user.username')}
    inputId="username"
    autocomplete="username"
  />

  <TextInput
    value={form?.data?.displayName ?? ''}
    label={$t('common.user.displayName')}
    inputId="displayName"
    autocomplete="name"
  />

  <div slot="actions">
    <button class="btn btn-primary w-full" type="submit">{$t('common.auth.signUp')}</button>
  </div>
</FormLayout>
