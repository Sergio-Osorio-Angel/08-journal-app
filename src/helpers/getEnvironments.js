export function getEnvironments() {
    import.meta.env;

    return {
        ...import.meta.env
    }
}