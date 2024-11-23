import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# HMM parameters
states = ['Soleado', 'Nublado', 'Lluvioso']
observations = ['Alta presión', 'Baja presión']
pi = np.array([0.5, 0.3, 0.2])  # Initial probabilities
A = np.array([[0.7, 0.2, 0.1],  # Transition matrix
              [0.3, 0.4, 0.3],
              [0.2, 0.3, 0.5]])
B = np.array([[0.8, 0.2],  # Emission matrix
              [0.4, 0.6],
              [0.2, 0.8]])

# Generate a long observed sequence
obs_seq = np.random.choice([0, 1], size=1000, p=[0.6, 0.4])  # 1000 observations


def viterbi_algorithm_stepwise(pi, A, B, obs_seq):
    T = len(obs_seq)
    N = len(states)
    delta = np.zeros((T, N))
    steps = []

    # Initial step
    delta[0] = pi * B[:, obs_seq[0]]
    delta[0] /= np.sum(delta[0])  # Normalize
    steps.append(delta[:1].copy())  # Ensure 2D array for animation

    # Recursion with normalization
    for t in range(1, T):
        for j in range(N):
            probs = delta[t-1] * A[:, j]
            delta[t, j] = np.max(probs) * B[j, obs_seq[t]]
        delta[t] /= np.sum(delta[t])  # Normalize
        steps.append(delta[:t+1].copy())  # Collect as 2D slice

    # Backtracking (not part of animation)
    path = np.zeros(T, dtype=int)
    path[-1] = np.argmax(delta[-1])
    for t in range(T-2, -1, -1):
        path[t] = np.argmax(delta[t] * A[:, path[t+1]])

    return steps, path


# Run Viterbi algorithm stepwise
steps, path = viterbi_algorithm_stepwise(pi, A, B, obs_seq)

# Animation setup
fig, ax = plt.subplots()
lines = [ax.plot([], [], label=state)[0] for state in states]
ax.set_xlim(0, len(obs_seq))
ax.set_ylim(0, 1)
ax.set_title('Viterbi Algorithm - Step by Step')
ax.set_xlabel('Time Step')
ax.set_ylabel('Probability')
ax.legend()

def update(frame):
    current_data = steps[frame]
    for line, state_probs in zip(lines, current_data.T):
        line.set_data(range(max(len(state_probs) - 50, 0),len(state_probs)), state_probs[max(len(state_probs) - 50, 0):len(state_probs)])
        ax.set_xlim(max(len(state_probs) - 50, 0),len(state_probs))
    ax.set_title(f'Viterbi Algorithm - Time Step {frame + 1}')
    return lines

ani = FuncAnimation(fig, update, frames=len(steps), interval=200, repeat=True)
plt.show()

# Display most probable state sequence
most_probable_states = [states[p] for p in path]
print("Most probable state sequence:", most_probable_states)
