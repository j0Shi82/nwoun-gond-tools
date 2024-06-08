<script>
    import { Button, Icon } from "@/utils/imports/components";
    import { getLocalizedRouteMatcher, localize } from "@/utils/imports/core";
    import { images } from "@/utils/imports/data";
    import { faUser } from "@fortawesome/free-solid-svg-icons";

    import { createClient } from "@supabase/supabase-js";

    const supabase = createClient(
        "https://bvvvppmucphfyhfxursk.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dnZwcG11Y3BoZnloZnh1cnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2MzgyODUsImV4cCI6MTk5NjIxNDI4NX0.oXUuvMUoUZqtvz6zEkPC25RIgiTHz6RaC2a6tp1j_j4",
    );

    let username = "";
    let password = "";

    const login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
    };
</script>

<div class="min-w-screen flex items-center justify-center px-5 mt-5 pt-16">
    <div
        class="w-full mx-auto rounded-lg bg-gray-300 bg-opacity-70 shadow-lg p-5 text-black border-nwoun border"
        style="max-width: 600px"
    >
        <div class="w-full pt-1 pb-5">
            <div
                class="bg-nwoun overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center"
            >
                <Icon data={faUser} scale="3" class="text-black" />
            </div>
        </div>
        <div class="mb-2">
            <input
                type="text"
                autofill="username"
                bind:value={username}
                class="bg-opacity-70 bg-gray-300 h-12 w-full border-nwoun rounded-md"
                placeholder={$localize("user.username")}
            />
        </div>
        <div class="mb-2">
            <input
                type="password"
                autofill="password"
                bind:value={password}
                class="bg-opacity-70 bg-gray-300 h-12 w-full border-nwoun rounded-md"
                placeholder={$localize("user.password")}
            />
        </div>
        <div class="mb-10">
            <Button
                text={$localize("user.login")}
                colorClasses="border-nwoun bg-gray-300 bg-opacity-70 text-black"
                borderSize="1"
                click={() => {
                    login();
                }}
            />
        </div>
        <div class="mb-10 text-center">Don't have an account? Create one!</div>
    </div>
</div>
