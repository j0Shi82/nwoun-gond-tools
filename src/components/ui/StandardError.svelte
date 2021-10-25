<script>
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { localize } from 'utils/imports/core';
import { Icon, Button } from 'utils/imports/components';

export let type = 'error';
export let callback = () => { };
</script>

<div class="w-full p-2 rounded-md font-bold  flex justify-center items-center">
    {#if type === 'error'}
        <Icon data="{faExclamationTriangle}" scale="{2}" class="text-nwoun flex-shrink-0"></Icon>
        <span class="text-nwoun">{$localize('errors.catError')}</span>
    {/if}
    {#if type === 'cta'}
        <Button click={callback} cssClasses="cursor-pointer ">
            <Icon data="{faExclamationTriangle}" scale="{2}" class="text-nwoun flex-shrink-0"></Icon>
            {$localize('errors.ctaError')}
        </Button>
    {/if}
</div>