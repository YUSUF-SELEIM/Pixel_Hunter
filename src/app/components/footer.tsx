import { FaGithub } from 'react-icons/fa'
function Footer() {
    return (
        <footer className="footer footer-center bg-gray-100 text-base-content p-6">
            <a href='https://github.com/YUSUF-SELEIM' target=''>
                <FaGithub className="text-3xl text-cyan-500" />
            </a>
        </footer>
    )
}

export default Footer