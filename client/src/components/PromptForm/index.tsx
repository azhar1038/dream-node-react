import { useState } from 'react';
import style from './index.module.css';

type PromptFormProps = {
  isLoading: boolean,
  onSubmit: (prompt: string) => void
};

export default function PromptForm({ isLoading, onSubmit }: PromptFormProps) {
  const [prompt, setPrompt] = useState<string>('');

  return (
    <form
      className={style['prompt-form']}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(prompt);
      }}
    >
      <label htmlFor="prompt">What did you Dream?</label>
      <textarea
        name="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button
        type="submit"
        disabled={isLoading}
      >
        { isLoading ? 'Generating...' : 'Generate' }
      </button>
    </form>
  );
}