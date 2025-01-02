class AudioVisualizer {
    constructor() {
        // Set up the SVG
        this.width = 800;
        this.height = 200;
        this.svg = d3.select('#visualization')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Audio context and analyzer setup
        this.audioContext = null;
        this.analyzer = null;
        this.dataArray = null;
        this.isPlaying = false;

        // Bind event listener
        document.getElementById('startButton').addEventListener('click', () => this.toggleVisualization());
    }

    async setupAudio() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new AudioContext();
            const source = this.audioContext.createMediaStreamSource(stream);
            this.analyzer = this.audioContext.createAnalyser();
            this.analyzer.fftSize = 256;
            source.connect(this.analyzer);
            
            this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
            return true;
        } catch (err) {
            console.error('Error accessing microphone:', err);
            return false;
        }
    }

    drawVisualization() {
        if (!this.isPlaying) return;

        // Get frequency data
        this.analyzer.getByteFrequencyData(this.dataArray);

        // Create bars
        const bars = this.svg.selectAll('rect')
            .data(this.dataArray);

        // Calculate bar width based on data length
        const barWidth = this.width / this.dataArray.length;

        // Enter new bars
        bars.enter()
            .append('rect')
            .merge(bars)
            .attr('x', (d, i) => i * barWidth)
            .attr('y', d => this.height - d)
            .attr('width', barWidth - 1)
            .attr('height', d => d)
            .attr('fill', d => `rgb(${d}, 50, 50)`);

        // Remove extra bars
        bars.exit().remove();

        // Request next frame
        requestAnimationFrame(() => this.drawVisualization());
    }

    async toggleVisualization() {
        const button = document.getElementById('startButton');
        
        if (!this.isPlaying) {
            if (!this.audioContext) {
                const success = await this.setupAudio();
                if (!success) return;
            }
            this.isPlaying = true;
            button.textContent = 'Stop Visualization';
            this.drawVisualization();
        } else {
            this.isPlaying = false;
            button.textContent = 'Start Visualization';
        }
    }
}

// Initialize the visualizer when the page load
export default AudioVisualizer