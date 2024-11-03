async function fetchLanguages() {
    try {
        const response = await fetch('https://api.github.com/gitignore/templates');
        const languages = await response.json();

        const languageSelect = document.getElementById("language");
        languages.forEach(language => {
            const option = document.createElement("option");
            option.value = language;
            option.textContent = language;
            languageSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching languages:", error);
    }
}

async function generateGitignore(language) {
    try {
        const response = await fetch(`https://api.github.com/gitignore/templates/${language}`);

        if (!response.ok) {
            throw new Error('Error fetching data from GitHub API. Please try again.');
        }

        const data = await response.json();
        return data.source.replace(/\\n/g, '\n');
    } catch (error) {
        console.error("Error fetching .gitignore:", error);
        return null;
    }
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    } catch (err) {
        console.error("Could not copy text: ", err);
    }
}

document.getElementById("generate").addEventListener("click", async function () {
    const language = document.getElementById("language").value;

    if (!language) {
        alert('Please select a programming language.');
        return;
    }

    const gitignoreContent = await generateGitignore(language);

    if (gitignoreContent) {
        await copyToClipboard(gitignoreContent);
    } else {
        alert("Failed to generate .gitignore. Please try again.");
    }
});

fetchLanguages();
