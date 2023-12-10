<script lang="ts">
  import TextInput from '$lib/components/form/TextInput.svelte';
  import { t } from '$lib/translations';
  import type { User } from 'lucia';
  import SettingsSection from './SettingsSection.svelte';
  import { globalConfig } from '$lib/config/globalConfig';
  import { validatePasswordFormat } from '$lib/ts/formUtils/userValidation/validateClient';
  import type { FormParseData } from '$lib/ts/formUtils/types';
  import { getTranslatedFormErrors, updateFormData } from '$lib/ts/formUtils/formUtilsClient';
  import type { ActionData } from '../$types';

  export let user: User;
  export let form: ActionData;

  let displayName = user.display_name;
  let password = '';

  $: wrapAndUpdateFormData(form?.data);
  $: formErrors = getTranslatedFormErrors(form?.errors, $t);

  $: passwordValid = validatePasswordFormat(password);

  function wrapAndUpdateFormData(formData: FormParseData | undefined) {
    ({ displayName, password } = updateFormData({ displayName, password }, formData));
  }
</script>

<SettingsSection title={$t('settings.accountSection.title')}>
  <div class="flex flex-col sm:flex-row gap-8">
    <div class="flex-1">
      <TextInput
        value={user.email}
        label={$t('common.auth.email')}
        inputId="email"
        type="email"
        autocomplete="email"
        required={false}
        disabled
      />

      <TextInput
        value={user.username}
        label={$t('common.user.username')}
        inputId="username"
        autocomplete="username"
        required={false}
        disabled
      />
    </div>

    <div class="flex-1">
      <TextInput
        bind:value={displayName}
        error={formErrors['displayName']}
        label={$t('common.user.displayName')}
        inputId="displayName"
        autocomplete="name"
        required
        maxlength={globalConfig.user.displayNameMaxLength}
      />

      <TextInput
        bind:value={password}
        error={formErrors['password']}
        errorHighlight={password.length > 0 && !passwordValid}
        label={$t('common.auth.passwordNew')}
        info={$t('common.auth.passwordHint', {
          s1: globalConfig.user.passwordMinLength.toString(),
        })}
        inputId="password"
        type="password"
        autocomplete="new-password"
        required={false}
      />
    </div>
  </div>
</SettingsSection>
