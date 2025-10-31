function LoginBtn() {
    function handleClick() {
        console.log("Click login button");
    }
    return (
        <>
            <button onClick={handleClick}>login</button>
        </>
    )
}
export default LoginBtn