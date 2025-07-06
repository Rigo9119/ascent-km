<script lang="ts">
	import Button from '@/lib/components/ui/button/button.svelte';

  let { isLoading, signInWithGoogle, signInWithFacebook, signInWithKakao } = $props();
</script>

<div>
	<p class="mt-2 text-sm text-gray-600">Or continue with</p>
	<div class="mt-3 flex flex-col justify-center gap-3">
		<Button
			type="button"
			disabled={isLoading}
			onclick={signInWithGoogle}
			class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
		>
			<img src="/google.svg" alt="Google" class="h-5 w-5" />
			Google
		</Button>
		<Button
			type="button"
			disabled={isLoading}
			onclick={signInWithFacebook}
			class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
		>
			<img src="/facebook.svg" alt="Facebook" class="h-5 w-5" />
			Facebook
		</Button>
		<Button
			type="button"
			disabled={isLoading}
			onclick={signInWithKakao}
			class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-[#FEE500] px-4 py-2 text-sm font-bold text-black shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-yellow-300 disabled:opacity-50"
		>
			Kakao
		</Button>
	</div>
	<div class="relative mt-6">
		<div class="absolute inset-0 flex items-center">
			<div class="w-full border-t border-gray-300"></div>
		</div>
		<div class="relative flex justify-center text-sm">
			<p class="bg-white px-2 text-gray-500">Or continue with email</p>
		</div>
	</div>
</div>
